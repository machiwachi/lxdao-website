# 外部链接配置

此目录包含项目中所有外部链接的集中配置。

## 使用方法

### 导入配置

```javascript
import EXTERNAL_LINKS from '@/config/externalLinks';
```

### 使用链接

```javascript
// 文档链接
<Link href={EXTERNAL_LINKS.docs.about}>About</Link>
<Link href={EXTERNAL_LINKS.docs.buidl}>Buidl</Link>
<Link href={EXTERNAL_LINKS.docs.governance}>Governance</Link>
<Link href={EXTERNAL_LINKS.docs.developerGuide}>Developer Guide</Link>

// 社交媒体链接
<Link href={EXTERNAL_LINKS.social.twitter}>Twitter</Link>
<Link href={EXTERNAL_LINKS.social.telegram}>Telegram</Link>
<Link href={EXTERNAL_LINKS.social.github}>GitHub</Link>
<Link href={EXTERNAL_LINKS.social.forum}>Forum</Link>

// 治理链接
<Link href={EXTERNAL_LINKS.governance.snapshot}>Snapshot</Link>

// 品牌资源链接
<Link href={EXTERNAL_LINKS.brand.mediaKit}>Media Kit</Link>
```

## 配置结构

```typescript
interface ExternalLinks {
  docs: {
    about: string;
    buidl: string;
    governance: string;
    developerGuide: string;
  };
  social: {
    twitter: string;
    telegram: string;
    github: string;
    forum: string;
  };
  governance: {
    snapshot: string;
  };
  brand: {
    mediaKit: string;
  };
}

const EXTERNAL_LINKS: ExternalLinks = {
  docs: { /* ... */ },
  social: { /* ... */ },
  governance: { /* ... */ },
  brand: { /* ... */ },
}
```

## 优势

1. **集中管理**：所有外部链接在一个文件中维护
2. **易于更新**：只需修改配置文件即可更新全站链接
3. **类型安全**：TypeScript 接口确保类型安全，IDE 提供智能提示
4. **避免错误**：编译时检查，防止拼写错误和链接失效
5. **代码整洁**：组件代码更简洁，可读性更强

## 添加新链接

在 `externalLinks.ts` 中添加新的链接，并按照合适的分类放置：

```typescript
// 1. 首先更新接口定义
interface ExternalLinks {
  docs: {
    about: string;
    buidl: string;
    governance: string;
    developerGuide: string;
    newDoc: string; // 添加新字段
  };
  // ...
}

// 2. 然后添加实际链接
const EXTERNAL_LINKS: ExternalLinks = {
  docs: {
    // ...
    newDoc: 'https://example.com/new-doc',
  },
  // ...
};
```

## 已更新的组件

以下组件已更新为使用此配置：

- `components/Header.jsx`
- `components/Footer.jsx`
- `components/CommunityLinkGroup.jsx`

如果在其他组件中使用外部链接，建议也更新为使用此配置。

