#
# KOA REST API
#
# build:
#   docker build --force-rm -t thingy-server .
# run:
#   docker run -d --rm --name thingy-server -p 80:7071 thingy-server
#
#

### BASE
FROM node:8 AS base
LABEL maintainer "ASETeamBlue <aseteamblue@gmail.com>"
# Set the working directory
WORKDIR /src
# Copy project specification and dependencies lock files
COPY package.json package-lock.json ./


### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies (only production)
RUN npm install --production
# Copy production dependencies aside
RUN cp -R node_modules /tmp/node_modules
# Install ALL Node.js dependencies
RUN npm install


### TEST
FROM dependencies AS test
# Copy app sources
COPY . .
# Run linters and tests
RUN npm run lint


### RELEASE
FROM base AS release
# Copy production dependencies
COPY --from=dependencies /tmp/node_modules ./node_modules
# Copy app sources
COPY . .
# Expose application port
EXPOSE 7071
# In production environment
ENV NODE_ENV production
ENV PORT 7071
# Run
CMD ["npm", "start"]
