Campaign finance website for Michigan's 12th congressional district. Uses Eleventy to pre-render dynamic donor information. Inspired by [eastbaydsa/bw-money](https://github.com/eastbaydsa/bw-money).

## Development

Start by installing dependencies and downloading the donor information:

```
npm install
export DATA_CSV_URL="https://..." - https://docs.google.com/spreadsheets/d/141U1JNSxRRFQ3tOQjyQwvBDHxlbS9iLNCqO6E8L_cGs/gviz/tq?tqx=out:csv&sheet="Working sheet" (current one used for testing)

    // "export-curated":"export DATA_CSV_URL='https://docs.google.com/spreadsheets/d/141U1JNSxRRFQ3tOQjyQwvBDHxlbS9iLNCqO6E8L_cGs/gviz/tq?tqx=out:csv&sheet="Final Sheet"',

npm run fetch:linux - for linux machines
npm run fetch:win64 - for windows 64 bit machines.



```


To start a local, live-refresh server, use

```
npm run develop
```

## Deployment

Netlify is used for deployment. Follow a standard setup process, making sure to add the `DATA_CSV_URL` environment variable.

To refresh the site with updated donor information, go to Netlify > `mi-twelve-money` > Deploys > Trigger deploy.

## License

This website uses a modified, [anti-facist MIT license](LICENSE).