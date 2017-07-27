# vPagination

A Vue.js pagination component

### [Demo](https://60kmlh.github.io/vPagination)


# Demo

```sh
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit
```

## Usage
```javascript
# somewhere
import Pagination from '../components/Pagination'

# in your component
components: {
    Pagination
  }
```
```html
<template>
  <div>
    <paginate
      :pageSizes="pageSize"
      :buttonCount="buttonCount"
      :totalNum="totalNum"
      :cbt="cbFun">
    </paginate>
  </div>
<template/>
```

#### Props
Name | type | default | description
---:| --- | ---| ---
pageSizes | Array | [10, 20, 50] | Number of pages per page
buttonCount | Number | 5 | Total count of pages
totalNum | Number | 50 | Number of total records

#### Events
Name | default | description
---:| --- | --- 
cb | (per, page) => { console.log(per, page) } | The method to call when page clicked 

## License
Copyright (c) 2017 60kmlh
Licensed under the MIT license.