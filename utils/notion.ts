import { Client } from '@notionhq/client';

// 初始化 Notion 客户端
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

// 统一输出结构（根据提供的 Notion 数据源字段）
export interface Event {
  id: string;
  title: string;
  date: string | null;
  tags: string[];
  location: string | null;
  images: string[];
}

// 最小 Notion 类型以避免使用 any
interface NotionRichText {
  plain_text?: string;
}

interface NotionFile {
  file?: { url?: string };
  external?: { url?: string };
}

interface NotionTitleProperty {
  title?: NotionRichText[];
}

interface NotionMultiSelectProperty {
  multi_select?: { name?: string }[];
}

interface NotionDateProperty {
  date?: { start?: string };
}

interface NotionPlaceValue {
  name?: string;
  plain_text?: string;
}

interface NotionPlaceProperty {
  place?: NotionPlaceValue | string;
}

interface NotionFilesProperty {
  files?: NotionFile[];
}

type NotionProperties = Record<string, unknown> & {
  名称?: NotionTitleProperty;
  标签?: NotionMultiSelectProperty;
  活动日期?: NotionDateProperty;
  位置?: NotionPlaceProperty;
  文件和媒体?: NotionFilesProperty;
};

interface NotionPage {
  id: string;
  properties?: NotionProperties;
}

// 获取所有已发布的条目（基于提供的 Notion Data Source 示例字段）
export const getPublishedEvents = async (): Promise<Event[]> => {
  const databaseId = '2803d6f3-d3a6-80d0-8576-c4d2c8b707f1';
  // const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID is not defined');
  }

  // 使用 Data Source 查询（与当前项目已有写法保持一致）
  const response: unknown = await notion.dataSources.query({
    data_source_id: '2803d6f3-d3a6-8108-8268-000b26b54b69',
    sorts: [{ property: '活动日期', direction: 'descending' }],
  });

  console.dir(response, { depth: null });

  const results: NotionPage[] =
    (response as { results?: NotionPage[] })?.results || [];

  const items: Event[] = results.map((page) => {
    const props: NotionProperties = page?.properties || {};

    // 名称（title）
    const titleProp = props['名称']?.title || [];
    const title: string = titleProp[0]?.plain_text || '';

    // 标签（multi_select）
    const tagsProp = props['标签']?.multi_select || [];
    const tags: string[] = Array.isArray(tagsProp)
      ? tagsProp.map((t) => (t?.name || '').trim()).filter(Boolean)
      : [];

    // 活动日期（date）
    const dateStart: string | undefined = props['活动日期']?.date?.start;

    // 位置（place）
    // Notion place 属性结构可能包含 name/address 等，这里读 name 或 plain_text
    const locationVal = props['位置']?.place;
    const location: string | undefined =
      typeof locationVal === 'string'
        ? locationVal
        : locationVal?.name || locationVal?.plain_text || undefined;

    // 文件和媒体（files）
    const files = props['文件和媒体']?.files || [];
    const images: string[] = files
      .map((f) => (f?.file?.url || f?.external?.url || '').trim())
      .filter((u) => !!u);

    return {
      id: page?.id,
      title,
      date: dateStart ?? null,
      tags,
      location: location ?? null,
      images,
    } as Event;
  });

  return items;
};

// 兼容旧命名（如仍有地方使用 posts）
export const getPublishedPosts = getPublishedEvents;
