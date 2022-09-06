FROM node:16-alpine

# create user in the docker image
USER node

# Creating a new directory for app files and setting path in the container
RUN mkdir -p /home/node/my-app && chown -R node:node /home/node/my-app

# setting working directory in the container
WORKDIR /home/node/my-app

# grant permission of node project directory to node user
COPY --chown=node:node . .

# installing the dependencies into the container
RUN yarn install

# container exposed network port number
EXPOSE 5000

# command to run within the container
CMD [ "yarn", "start" ]