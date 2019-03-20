# Unchained Engine

Licensed under the EUPL 1.2

[![CLA assistant](https://cla-assistant.io/readme/badge/unchainedshop/unchained)](https://cla-assistant.io/unchainedshop/unchained)

### Settings API
E.g. given these settings:

```
// meteor-settings.json
{
  "unchained": {
    "files": {
      "media": {
         "maxSize": 10485760
      }
    }
  }
}
```
you can access `maxSize` with this:

```
import { getSetting } from 'meteor/unchained:core-settings';

const maxSize = getSetting('files.media.maxSize')

// it uses lodash.get, so you can pass a path as an array
const maxSize = getSetting(["files", "media", "maxSize"])

// and you can specify a default value

const maxSize = getSetting("files.avatars.maxSize", 10485760);
```
### configure FileCollections
to set gridfs for all collections, use this:

```
{
  "unchained": {
    "files": {
      "default": {
        "storage": {
          "type": "gridfs"
        }
      }
    }
  }
}
```
all collections will use `default`, unless specified directly:

```
{
  "unchained": {
    "files": {
      "media": {
        "maxSize": 10485760
      }
    }
  }
}
```

### Cart API

How order positions get generated out of quotations and configurable products:

* addCartProduct of a ConfigurableProduct resolves to the concrete product if enough variation vector parameters provided through product configuration parameters. The source productId is saved into context.origin, the variation configuration is stored on the item along other product configuration parameters

* addCartQuotation resolved to the actual product and adds that to the cart. It uses a transform method of the quotation plugin system to transform a quotationConfiguration to a productConfiguration. The source quotationId is saved into context.origin

It's also possible to chain:

addCartQuotation is called with quotation Y
-> resolves to a Matrix product X with a specific configuration
-> specific configuration is handed to vector logic trying to find a distinct concrete product Z
-> bundle product Z is resolved

Now the cart looks like this:

1 x Bundle Z
