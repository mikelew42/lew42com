# Plugins vs Extensions

When you use `class SSLServer extends Server`, it's a little cleaner than Events and Plugins.  

However, **you can't have multiple inheritance** with classes, so you can't use both SSL and WebSockets at the same time, without rewriting logic.