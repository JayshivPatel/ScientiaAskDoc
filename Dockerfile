FROM node

ARG scientia_gid

# Copy sources over
COPY . /scientia

# Set up FS
RUN mkdir /yarn

# Install dependencies
WORKDIR /scientia
RUN yarn install && yarn build && yarn global add serve

# Setup user with right accesses to logs
RUN addgroup --gid $scientia_gid scientia
RUN usermod -aG scientia root

# Start server
CMD ["yarn", "serve", "-s", "build", "-l", "3000", ">>", "/yarn/application.log"]