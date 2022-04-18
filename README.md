Campaign finance website for Michigan's 12th congressional district. Uses Eleventy to pre-render dynamic donor information. Inspired by [eastbaydsa/bw-money](https://github.com/eastbaydsa/bw-money).

## Development

Start by installing dependencies and downloading the donor information:

```
npm install
export DATA_CSV_URL="https://..."
npm run fetch
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