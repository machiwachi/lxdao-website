/**
 * External Links Configuration
 * 集中管理所有外部链接，方便维护和更新
 */

const EXTERNAL_LINKS = {
  // 文档和资源
  docs: {
    about:
      'https://lxdao.notion.site/Introduction-723ae07d53fd40b79928d227afd6a487',
    buidl:
      'https://lxdao.notion.site/LXDAO-Buidl-288dceffe40b8033a8ccdc65b83189cf',
    governance:
      'https://lxdao.notion.site/LXDAO-27edceffe40b80ffae24d0ab3a17c650',
    developerGuide: 'https://github.com/lxdao-official/LXDAO-Developer-Guide',
  },

  // 社交媒体
  social: {
    twitter: 'https://twitter.com/LXDAO_Official',
    telegram: 'https://t.me/LXDAO',
    github: 'https://github.com/lxdao-official',
    forum: 'https://forum.lxdao.io',
  },

  // 治理和投票
  governance: {
    snapshot: 'https://snapshot.org/#/lxdao.eth',
  },

  // 品牌资源
  brand: {
    mediaKit: 'https://web3logo.info/detail/LXDAO/1',
  },
} as const;

export default EXTERNAL_LINKS;
