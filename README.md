# Work In Progress

## Local Development
Run the api app like:
```bash
bundle exec rackup -p 1111
```

Setup nginx vhost:
```conf
    server {
        listen       7373;
        server_name  localhost;

        location / {
            root   /users/dylan/repos/cocktails-web/;
            index  index.html index.htm;
        }

        location /api {
            proxy_pass   http://127.0.0.1:1111;
        }
    }
```

Reload nginx:
```bash
sudo nginx -s reload
```

Now the app is accessible at `http://localhost:7373`
