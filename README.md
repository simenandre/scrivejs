# Scrive Typescript SDK

[![lifecycle](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://www.tidyverse.org/lifecycle/#experimental)
[![NPM version](https://img.shields.io/npm/v/scrive-sdk.svg)](https://www.npmjs.com/package/scrive-sdk)
[![codecov](https://codecov.io/gh/cobraz/scrivejs/branch/main/graph/badge.svg)](https://codecov.io/gh/cobraz/scrivejs)
![npm bundle size](https://img.shields.io/bundlephobia/min/scrive-sdk)

Use this to integrate with the [Scrive API][scrive-docs].

**Note**: Don't expect full coverage for the API, as there is no code generating
involved; we add features as we go. Contributions are very welcome!

[scrive-docs]: https://apidocs.scrive.com/

## Features

- ✅ Great test coverage
- 💁‍♂️ Inline documentation
- 🔒 Runtime type-checking

## Documentation

To get started, install the NPM package.

```shell
yarn add scrive-sdk
```

Let's look at an example where we are creating a new document based on a
template.

**Tip**: In the Scrive UI, you'll find the ID as the numeric value in the URL.
Let's say the URL to the document is `https://scrive.com/d/9222321123123`, then
the ID is `9222321123123

```typescript
import { ScriveSdk } from 'scrive-sdk';

const client = ScriveSdk.usePersonalAccessCredentials({
  apitoken: 'something',
  accesstoken: 'is-something',
  apisecret: 'when-there-nothing',
  accesssecret: 'here',
});

client.prepare().newDocumentFromTemplate('9222321123123');
```

The SDK provides a way to construct the SDK class based on which way you are
going to authenticate with the API. For now, we only support _personal access
credentails_ as shown above, but I imagine this will look very similar once
OAuth is added too.
