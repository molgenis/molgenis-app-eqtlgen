# molgenis-app-eqtlgen
Frontend for eqtlgen paper

## MOLGENIS data upload
Does not work for files larger then 150mb, must be loaded in Postgres itself.

## Elasticsearch settings:
Update your elastic search setting to index files larger then 10000*10 rows.Execute this command on the command line.

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"index.max_result_window" : "10000000"}' "localhost:9200/_all/_settings"
```