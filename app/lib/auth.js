import jwt from 'jsonwebtoken';

export function isAuthorized(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ Missing or malformed auth header');
    return false;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token is valid:');
    return true;
  } catch (error) {
    console.log('❌ Invalid token:', error.message);
    return false;
  }
}
