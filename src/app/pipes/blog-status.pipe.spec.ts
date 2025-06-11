import { BlogStatusPipe } from './blog-status.pipe';

describe('BlogStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new BlogStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
