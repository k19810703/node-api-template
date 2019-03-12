FROM node
ADD . /usr/src/
RUN cd /usr/src/ \
    && rm -rf /usr/src/node_modules \
    && npm install
ENV NODE_ENV=production \
  PORT=3000
EXPOSE 3000
WORKDIR /usr/src
CMD ["node","server.js"]
