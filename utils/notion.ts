import { Client } from '@notionhq/client';

// 初始化 Notion 客户端
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

// 定义我们期望的文章数据结构
export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags: string[];
}

// 获取所有已发布的文章列表
export const getPublishedPosts = async () => {
  const databaseId = '2803d6f3-d3a6-80d0-8576-c4d2c8b707f1';
  //   const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID is not defined');
  }

  const response = await notion.dataSources.query({
    data_source_id: '2803d6f3-d3a6-8108-8268-000b26b54b69',
    // 过滤出 "Published" 复选框为 true 的文章
    // filter: {
    //   property: 'Published',
    //   checkbox: {
    //     equals: true,
    //   },
    // },
    // 按发布日期降序排序
    // sorts: [
    //   {
    //     property: 'PublishedDate',
    //     direction: 'descending',
    //   },
    // ],
  });

  console.dir(response, { depth: null });

  return response;

  //   //   return response.;
  //   // 将 Notion 返回的复杂结构转换为我们需要的简洁结构
  //   return response.results
  //     .map((page: any) => {
  //       return {
  //         id: page.id,
  //         title: page.properties.Title.title[0]?.plain_text || 'Untitled',
  //         slug: page.properties.Slug.rich_text[0]?.plain_text || '',
  //         date: page.properties.PublishedDate.date?.start || '',
  //         tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
  //       };
  //     })
  //     .filter((post) => post.slug); // 过滤掉没有 slug 的文章
};
