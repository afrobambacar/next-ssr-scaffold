FROM node:20-alpine

ARG NEXT_PUBLIC_WWW_HOST
ARG NEXT_PUBLIC_CDN_HOST
ARG NEXT_PUBLIC_API_HOST

ENV HOME=/home/node
ENV APP_DIR=$HOME/app
ENV NEXT_PUBLIC_WWW_HOST=$NEXT_PUBLIC_WWW_HOST
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_CDN_HOST=$NEXT_PUBLIC_API_HOST

RUN echo $NEXT_PUBLIC_API_HOST

COPY ./ $APP_DIR/

WORKDIR $APP_DIR

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    yarn && \
    apk del build-dependencies

RUN yarn install && yarn cache clean

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
