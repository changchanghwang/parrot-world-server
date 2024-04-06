import { commentOf } from '..';

describe('Comment Model Test', () => {
  describe('update test', () => {
    test('parameter로 들어온 변경된 값을 업데이트 할 수 있다.', () => {
      const comment = commentOf({ content: 'this is test content' });
      comment.update({ content: 'test content' });
      expect(comment.content).toBe('test content');
    });
  });
});
