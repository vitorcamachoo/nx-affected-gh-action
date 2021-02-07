import * as core from '@actions/core'
import {
    ProjectGraphNode,
    ProjectType,
    createProjectGraph
} from '@nrwl/workspace/src/core/project-graph'
import {calculateFileChanges} from '@nrwl/workspace/src/core/file-utils'
import {parseFiles} from '@nrwl/workspace/src/command-line/shared'
import {filterAffected} from '@nrwl/workspace/src/core/affected-project-graph'

const filterAndMap = (nodes: ProjectGraphNode[] = [], filter: ProjectType) => {
    return nodes.filter(({type}) => type == filter).map(({name}) => name)
}

interface Options {
    base?: string
    head?: string
}

export default async function getAffected(options: Options = {}) {
    try {
        const nxArgs = {
            plain: true,
            ...options
        }
        const {nodes} = filterAffected(
            createProjectGraph(),
            calculateFileChanges(parseFiles(nxArgs).files, nxArgs)
        )
        const allAffected = Object.values(nodes)
        return {
            apps: filterAndMap(allAffected, ProjectType.app),
            libs: filterAndMap(allAffected, ProjectType.lib)
        }
    } catch (e) {
        core.error(`Attempt failed: ${e.message}`)
        process.exit(1)
    }
}
