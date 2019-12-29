const flatterator =  require('../dist').flatterator;
const data = { 'categories': [
  {
    'subCategories': [
      {
        'subCategories': {
          'categoryId': '810002'
        },
        'subChildCategories': []
      }, {
        'subCategories': {
          'categoryId': '810003'
        },
        'subChildCategories': []
      }, {
        'subCategories': {
          'categoryId': '810004'
        },
        'subChildCategories': []
      }
    ],
    'topLevelCategory': {
      'categoryId': '810001'
    }
  }, {
    'subCategories': [
      {
        'subCategories': {
          'categoryId': '1204'
        },
        'subChildCategories': []
      }, {
        'subCategories': {
          'categoryId': '1172'
        },
        'subChildCategories': []
      }
    ],
    'topLevelCategory': {
      'categoryId': '1205'
    }
  }]
};

describe('Utility for iterate over array and nested structures', () => {
  describe('The "flatterator":', () => {
    it('should accept no arguments', () => {
      let iterator = flatterator();
      let invoked = false;
      for (let val of iterator) {
        invoked = true;
      }
      expect(invoked).toBeFalsy();
    });

    it('should iterate over array', () => {
      let testData = [1, 2, 3, 4];
      let iterator = flatterator(testData);
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect(testData).toEqual(result);
    });

    it('should iterate over any type by making it wrapped into array', () => {
      let iterator = flatterator(1);
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect([1]).toEqual(result);
    });

    it('should iterate into inner values for one property', () => {
      let testData = [1, 2, {sub: 3}, 4];
      let iterator = flatterator(testData, 'sub');
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect([1, 2, 3, 4]).toEqual(result);
    });

    it('should iterate into inner values for given properties', () => {
      let testData = [1, 2, {sub: 3}, {pub: 4}];
      let iterator = flatterator(testData, ['sub', 'pub']);
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect([1, 2, 3, 4]).toEqual(result);
    });

    it('should iterate into inner arrays for given properties', () => {
      let testData = [1, 2, {sub: [3, 4]}];
      let iterator = flatterator(testData, ['sub', 'pub']);
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect([1, 2, 3, 4]).toEqual(result);
    });

    it('should iterate into deep arrays for given properties', () => {
      let testData = [1, 2, {sub: [3, {pub: [4]}]}];
      let iterator = flatterator(testData, ['sub', 'pub']);
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect([1, 2, 3, 4]).toEqual(result);
    });
  });
});
