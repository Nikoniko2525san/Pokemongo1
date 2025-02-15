const webpush = require('web-push');

// VAPIDキーの設定
const vapidKeys = {
  publicKey: '<YOUR_PUBLIC_KEY>',
  privateKey: '<YOUR_PRIVATE_KEY>'
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const subscription = req.body.subscription;
    const payload = JSON.stringify({ title: '新しいポケモン発見!', message: 'ポケモンを捕まえるチャンス！' });

    try {
      await webpush.sendNotification(subscription, payload);
      res.status(200).send('Push notification sent');
    } catch (error) {
      console.error('Error sending push notification:', error);
      res.status(500).send('Error sending push notification');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};