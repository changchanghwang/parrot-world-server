import { add } from '@libs/date';

describe('Date Test', () => {
  describe('add Test', () => {
    test('add 메서드는 초를 추가할 수 있다.', () => {
      expect(add({ date: new Date('2024-03-22T00:00:00.000Z'), value: 1, unit: 'seconds', timezone: 'UTC' })).toEqual(
        new Date('2024-03-22T00:00:01.000Z'),
      );
    });
    test('add 메서드는 분을 추가할 수 있다.', () => {
      expect(add({ date: new Date('2024-03-22T00:00:00.000Z'), value: 1, unit: 'minutes', timezone: 'UTC' })).toEqual(
        new Date('2024-03-22T00:01:00.000Z'),
      );
    });
    test('add 메서드는 시간을 추가할 수 있다.', () => {
      expect(add({ date: new Date('2024-03-22T00:00:00.000Z'), value: 1, unit: 'hours', timezone: 'UTC' })).toEqual(
        new Date('2024-03-22T01:00:00.000Z'),
      );
    });
    test('add 메서드는 일을 추가할 수 있다.', () => {
      expect(add({ date: new Date('2024-03-22T00:00:00.000Z'), value: 1, unit: 'days', timezone: 'UTC' })).toEqual(
        new Date('2024-03-23T00:00:00.000Z'),
      );
    });
    test('add 메서드는 주를 추가할 수 있다.', () => {
      expect(add({ date: new Date('2024-03-22T00:00:00.000Z'), value: 1, unit: 'weeks', timezone: 'UTC' })).toEqual(
        new Date('2024-03-29T00:00:00.000Z'),
      );
    });
    test('add 메서드는 월을 추가할 수 있다.', () => {
      expect(add({ date: new Date('2024-03-22T00:00:00.000Z'), value: 1, unit: 'months', timezone: 'UTC' })).toEqual(
        new Date('2024-04-22T00:00:00.000Z'),
      );
    });
    test('add 메서드는 년을 추가할 수 있다.', () => {
      expect(add({ date: new Date('2024-03-22T00:00:00.000Z'), value: 1, unit: 'years', timezone: 'UTC' })).toEqual(
        new Date('2025-03-22T00:00:00.000Z'),
      );
    });
  });
});
