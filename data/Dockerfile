FROM postgres:16-alpine
ENV PGDATA=/var/lib/postgresql/data
RUN mkdir -p $PGDATA
RUN chown -R postgres $PGDATA
RUN chmod 0700 -R $PGDATA

VOLUME /var/lib/postgresql/data