import en from './messages/en.json';
import uk from './messages/uk.json';

function keyPaths(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null ? keyPaths(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe('messages', () => {
  it('uk and en define exactly the same keys', () => {
    expect(keyPaths(en).sort()).toEqual(keyPaths(uk).sort());
  });

  it('carries all 21 namespaces of the web app', () => {
    expect(Object.keys(en)).toHaveLength(21);
  });
});
