## It just can iterate over array where items can itself has a children so it make it in flatten way

```javascript
const flatterator = require('flatterator).flatterator;
const data = [
  {
    a: 1
  },
  {
    a: 2
  },
  {
    a: 3,
    someChild: [
      {
        a: 4
      }
    ]
  }
];
for (const i of flatterator(data, 'someChild' /* or array of props to be visited*/) {
  console.log( i.a ); /* 1, 2 , 3, 4 will be printed*/
}
```
