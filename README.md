# Usage

Add module:

```js
    angular.module('app', [
        'ttmd.table'
    ]);
```

Include file:

```js
require('@tt-ui-md-table/dist/tt-ui-md-table.min.css');
require('@tt-ui-md-table/dist/tt-ui-md-table.min.js');
```

### Required dependencies

* Angular 1.5.2
* Angular Material 1.0.2

************************

#DEMO

## Features

### Desktop view and mobile view

The default breakpoint is 'xs',  able to pass `breakpoint` bindings to the component

```html
<ttmd-table items="vm.items" headers="vm.headers" breakpoint="sm"></ttmd-table>
```

### Force Mobile View

If there is a case you only want to display mobile view, pass in `force-mobile`:

```html
<ttmd-table items="vm.items" headers="vm.headers" force-mobile="true"></ttmd-table>
```

### Type

To re-render the data efficient, you can have `type`:

```html
<ttmd-table items="vm.accounts.dueDate" headers="vm.headers" type="dueDate"></ttmd-table>
```

The `type` you pass in , will be the `listType` inside js:

```js
        this.SomeService.fetchDataAccordingPagination(limit, offset, listType)
            .then((res) => {
                if(listType){
                    this.accounts[listType] = [
                        ...res
                    ];
                }
            })
```

### Toolbar

To display the toolbar for the table, passing `tooblar` attr. Which is an object contains `title` and `icon`:
Here `icon` is Material font icon: string

```html
<ttmd-table items="vm.items" headers="vm.headers" toolbar="{
   title="Due Date"
   icon="account_circle"
}"></ttmd-table>
```

### Pagination

The desktop and mobile pagination will be handle differently. To enable pagination, need to pass in `total-number` to tell how many pages in total. `on-page-change` the function need to be called when fetch another page's data.

```html
<ttmd-table items="vm.items" headers="vm.headers" total-number="vm.totalNumber" on-page-change="vm.fetchData(payload)"></ttmd-table>
```

### Sort

Able to `sort` data according to the attr, this should be an array, but currently, only work with the first element inside the array.

```html
<ttmd-table items="vm.items" headers="vm.headers" sort=['dueDate']"></ttmd-table>
```

### Exclude

If there is any attr inside the data you don't want to display on the interface, you can use `exclude`:

```html
<ttmd-table items="vm.items" headers="vm.headers" exclude="['id']"></ttmd-table>
```

### Pipes

You can use Angular built-in filter such as `date` & `currency` by adding `pipies` to format the field:

```html
<ttmd-table items="vm.items" headers="vm.headers" pipes="vm.pipes"></ttmd-table>
```

```js
this.pipes = {
    currency: {
        targets: ['amount', 'amountWithOutTax'],
        foramt: '$' // default $, optional
    },
    date: {
        tragets: ['dueDate'],
        format: 'mm-DD-yyyy'
    }
}
```

### Highlight Row

You can highlight row by adding `highlight-row` to the html:

```html
<ttmd-table items="vm.items" headers="vm.headers" highlight-row="vm.someFn"></ttmd-table>
```

It takes function:

```js
//Item is sent back with callback
const someFn = (item) => {
    return fn(item.someAttr); // parsing some logic
}
```

### Change the limits

By default, desktop view show 8 pre-page, mobile view shows 3 pre-page, you can config this for each table:

```html
<ttmd-table items="vm.items" headers="vm.headers" limits="{desktop: 5, mobile: 4}"></ttmd-table>
```

### Action

Besides displaying data, you can pass in action. By default, action will be shown as a button

```html
                            <ttmd-table
                                headers="vm.multiPaymentsHeaders"
                                items="vm.accounts.all"
                                total-number="vm.accounts.totals.all"
                                on-page-change="vm.updateMultiPaymentList(payload)"
                                type="all"
                                breakpoint="sm"
                                sort="['dueDate']"
                                toolbar="{
                                    title: vm.$translate.instant('paymentComponent.allPendingBills'),
                                    icon: 'account_circle'
                                }">
                                <ttmd-actions>
                                    <ttmd-action
                                        text="vm.$translate.instant('paymentComponent.pay')"
                                        on-click="vm.pay(payload)"
                                    ></ttmd-action>
                                </ttmd-actions>
                            </ttmd-table>
```

#### Text or Button ?

If there is a case you want to display as a button based on prop `something` is true, and just display normal text if  `something` is false.

```html
        <ttmd-actions>
            <!-- Button -->
            <ttmd-action
                show-as="button"
                if="something"
                text="pay"
            ></ttmd-action>
            <!-- Text -->
            <ttmd-action
                show-as="text"
                if="!something"
                text="Paid"
            ></ttmd-action>
        </ttmd-actions>
```

### Row Detail

If you want to display more detail information when click the row, you can add `<ttmd-detail>` to the code, inside `<ttmd-detail>`, passing the directive you want to display. Also add `on-row-click` to the <ttmd-table>

```html
    <ttmd-table
        items="vm.invoices"
        headers="vm.headers"
        on-row-click="vm.someFn(payload)">
        <ttmd-detail>
            <your_directive selected-invoice="vm.someData"></your_directive>
        </ttmd-detail>
    </ttmd-table>
```

Inside `someFn()` function, it will return `someData` for `your_directive` to display.

```js
    someFn(payload){
        this.someData = payload;
    }
```

****************

## Global Config

It is possible to config for all the tables inside application.
To do that, go to the `ngModule.config()`, inject `ttmdTableProvider`:

```js
ngModule.config( (ttmdTableProvider) => {
    ttmdTableProvider.setConfig({
        limits: {desktop: 7, mobile: 4},
        breakpoint: 'sm'
    })
});
```

### Default Config value

```js
const _defaultConfigs = {
            forceMobile: false,
            breakpoint: 'xs',
            limits: {
                desktop: 8,
                mobile: 3
            }
        }
```

****************


## Data Structure

### items: Array[Object]  (required)

```js
[
    {
      "serviceCode": "1-260-865-6252 x638",
      "username": "Milton Mraz",
      "amount": "8.03",
      "dueDate": "2016-05-20T05:15:02.719Z"
    },
    {
      "serviceCode": "1-965-662-5118",
      "username": "Alessandro Kassulke",
      "amount": "8.61",
      "dueDate": "2016-06-25T19:15:02.720Z"
    }
]
```

### headers: Array (optional)

```js
// Using angular-translate inside the table component, so you need to give the path to find your value
vm.headers =[
  'some.path.to.value',
  'some.path.to.value2'
]
```

### total-number: number (required if need pagination)

### on-page-change: function (required if need pagination)

### force-mobile: boolean (optional)

### breakpoint: ['xs', 'sm', 'md', 'lg'] (optional)

### limits: Object (optional)

```js
vm.limits = {
    desktop: 3,
    mobile: 3,
}
```

### sort: Array[string] (optional)

### exclude: Array[string] (optional)

### toolbar: Object (optional)

```js
 vm.toolbar = {
    title: this.$translate.instant('path.to.value'),
    icon: 'string'
 }
```
### pipes: Object

```js
vm.pipes = {
    target: [],
    foramt: string
}
```

### highlight-row: function

### type: string (attr on the object) (optional)

### show-as: Array[string]
Default: 'button'
Available value: 'button', 'text'

### if: string: expression
Use the attr on the each object
```js
if= "someAttr > 3"; // if someAttr = 5, then action doesn't show, if someAttr = 2, then action will show
```
