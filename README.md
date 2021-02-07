<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# action-nx-affected-apps
A Github Action to determine the affected apps and libs within an Nx Monorepo using @nwrl/workspace api.

> **NOTE:** this action won't work if your repo isn't an [Nx Workspace](https://nx.dev/web)

## Inputs

### `head`

SHA of the commit to compare **to**


### `base`

SHA of the commit to compare **from**


## Outputs

### `affected-apps`

a JSON-encoded array of app names which are changed between the `base` and `head` commits

### `affected-libs`

a JSON-encoded array of app names which are changed between the `base` and `head` commits


## Example

This action requires that your repo has been cloned by `actions/checkout`, and has node setup by `actions/setup-node`

```yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - id: nx-affected
        uses: vitorcamachoo/nx-affected-gh-action@v1.0.0
        with:
          base: BASE
          head: HEAD
      - name: Print affected
        run: |
          echo affected: ${{ steps.nx-affected.outputs.affected}}
          echo affected-apps: ${{ steps.nx-affected.outputs.affected-apps }}
          echo affected-libs: ${{ steps.nx-affected.outputs.affected-libs }}
```