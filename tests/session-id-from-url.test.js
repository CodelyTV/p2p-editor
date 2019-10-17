import sessionIdFromUrl from '../src/session-id-from-url'

test('it should extract session id from first argument of URL', () => {
    let url = 'http://domainname.tld/session-id-1'
    expect(sessionIdFromUrl(url)).toBe('session-id-1');

    url = 'http://domainname.tld/session-id-2/'
    expect(sessionIdFromUrl(url)).toBe('session-id-2');

    url = 'https://domainname.tld/session-id-3/another-argument'
    expect(sessionIdFromUrl(url)).toBe('session-id-3');
});


test('it should extract session id from first argument of URL when URL contain query strings', () => {
    const url = 'https://domainname.tld/session-id-4/?param=one&other-param=two'
    expect(sessionIdFromUrl(url)).toBe('session-id-4');
});

test('it should return null when session id is not in URL', () => {
    let url = 'http://domainname.tld'
    expect(sessionIdFromUrl(url)).toBeNull();

    url = 'http://domainname.tld/'
    expect(sessionIdFromUrl(url)).toBeNull();
});
