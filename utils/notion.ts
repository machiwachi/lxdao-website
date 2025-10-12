import { Client } from '@notionhq/client';

import LINKS from '@/config/links';

const notion = new Client({ auth: process.env.NOTION_SECRET });

export interface Event {
  id: string;
  title: string;
  date: string | null;
  tags: string[];
  location: string | null;
  images: string[];
}

export interface TwitterItem {
  id: string;
  text: string;
  profile: string;
  user_name: string;
  user_handler: string;
}

export interface Partner {
  name: string;
  logo: string;
  link: string;
}

// 小工具：尽可能把 Notion 任意属性转成字符串
const textOf = (v: any): string => {
  if (!v) return '';
  if (typeof v === 'string') return v.trim();
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v?.plain_text === 'string') return v.plain_text.trim();
  if (typeof v?.name === 'string') return v.name.trim();
  if (typeof v?.url === 'string') return v.url.trim();
  if (typeof v?.email === 'string') return v.email.trim();
  if (typeof v?.phone_number === 'string') return v.phone_number.trim();
  if (typeof v?.text === 'string') return v.text.trim();
  const file = v?.file?.url || v?.external?.url;
  if (typeof file === 'string') return file.trim();
  const t = v?.type;
  if (t === 'title')
    return (v.title || [])
      .map((r: any) => r?.plain_text || '')
      .join('')
      .trim();
  if (t === 'rich_text')
    return (v.rich_text || [])
      .map((r: any) => r?.plain_text || '')
      .join('')
      .trim();
  if (Array.isArray(v))
    return v
      .map((r) => (typeof r === 'string' ? r : r?.plain_text || ''))
      .join('')
      .trim();
  for (const x of Object.values(v as Record<string, unknown>)) {
    const s = textOf(x as any);
    if (s) return s;
  }
  return '';
};

const pick = (props: Record<string, any>, keys: string[]): string => {
  for (const k of keys)
    if (props[k]) {
      const s = textOf(props[k]);
      if (s) return s;
    }
  return '';
};

const firstImage = (props: Record<string, any>): string => {
  for (const v of Object.values(props)) {
    const url =
      v && typeof v === 'object' && (v as any).url
        ? (v as any).url
        : textOf(v as any);
    if (
      typeof url === 'string' &&
      (/(png|jpg|jpeg|gif|webp)/i.test(url) || url.includes('pbs.twimg.com'))
    )
      return url;
  }
  return '';
};

export const getPublishedEvents = async (): Promise<Event[]> => {
  const { results = [] } = await notion.dataSources.query({
    data_source_id: LINKS.notionDataSources.events,
    sorts: [{ property: '活动日期', direction: 'descending' }],
  } as any);

  return (results as any[]).map((page) => {
    const props = (page?.properties || {}) as Record<string, any>;
    const title = textOf(props['名称']);
    const tags = (props['标签']?.multi_select || [])
      .map((t: any) => t?.name)
      .filter(Boolean);
    const date = props['活动日期']?.date?.start || null;
    const location = textOf(props['位置']);
    const images = (props['文件和媒体']?.files || [])
      .map((f: any) => f?.file?.url || f?.external?.url)
      .filter(Boolean);
    return { id: page.id, title, date, tags, location, images } as Event;
  });
};

export const getTwitterData = async (): Promise<TwitterItem[]> => {
  const { results = [] } = await notion.dataSources.query({
    data_source_id: LINKS.notionDataSources.twitter,
    page_size: 100,
    sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
  });

  return (results as any[])
    .map((p) => {
      const props = (p?.properties || {}) as Record<string, any>;
      const text =
        pick(props, ['推文内容', 'text', 'content', 'Text', 'Content']) ||
        textOf(props);
      const id =
        pick(props, [
          'id',
          'tweet_id',
          'tweetId',
          'Tweet ID',
          'TweetId',
          '标题',
          'title',
        ]) ||
        p?.id ||
        '';
      const profile =
        pick(props, [
          'ProfileImage',
          'Profile Image',
          '用户资料',
          'profile',
          'avatar',
          'image',
          'img',
          'Profile',
          'Avatar',
          'Image',
        ]) || firstImage(props);
      const user_name = pick(props, [
        '用户名',
        'user_name',
        'username',
        'name',
        'User Name',
        'Username',
        'Name',
      ]);
      const user_handler = pick(props, [
        '用户账号',
        'user_handler',
        'handle',
        'user_handle',
        'twitter',
        'Twitter',
        'Handle',
      ]);
      return { id, text, profile, user_name, user_handler } as TwitterItem;
    })
    .filter((it) => !!it.text);
};

export const getPartnersData = async (): Promise<Partner[]> => {
  const { results = [] } = await notion.dataSources.query({
    data_source_id: LINKS.notionDataSources.partners,
    page_size: 100,
    sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
  });

  console.log('partners', results);

  return (results as any[])
    .map((p) => {
      const props = (p?.properties || {}) as Record<string, any>;
      const name = pick(props, ['名称', 'name', 'Name', 'title']);
      const logo =
        pick(props, ['Logo', 'logo', 'Logo Image', 'image', 'Image', '图片']) ||
        firstImage(props);
      const link = pick(props, ['链接', 'link', 'Link', 'url', 'URL', '网站']);
      return { name, logo, link } as Partner;
    })
    .filter((partner) => !!partner.name);
};
