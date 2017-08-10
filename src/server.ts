import { createServer } from 'http';

createServer()
  .listen(8080, (error) => {
    if (error) {
      console.error('Cannot start server', error);
      return;
    }

    console.log('Server is running');
  });
