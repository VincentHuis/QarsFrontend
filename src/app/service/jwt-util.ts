export function getIdFromJwtCookie(): number | null {
  const cookieName = 'token';
  const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));

  if (match) {
    try {
      const token = match[2];
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.id;
    } catch (e) {
      console.error('Krijg ID niet uit JWT', e);
      return null;
    }
  }
  return null;
}
