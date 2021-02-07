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
      - uses: nelonoel/branch-name@v1.0.1
      - id: nx-affected
        uses: vitorcamachoo/nx-affected-gh-action@master
        with:
          base: ${{ env.BRANCH_NAME }}
          head: HEAD
      - name: Print affected
        run: |
          echo ${{ steps.nx-affected.outputs.affected-apps }}
          echo ${{ steps.nx-affected.outputs.affected-libs }}
```