import * as core from '@actions/core'
import getAffected from './getAffected'

export async function run(): Promise<void> {
    try {
        const base = core.getInput('base') || 'HEAD~1'
        const head = core.getInput('head') || 'HEAD'

        core.info(`Getting diff from ${base} to ${head}`)

        const affected = await getAffected({base, head})
        core.info(JSON.stringify(affected))
        core.setOutput('affected-apps', affected?.apps?.join(' '))
        core.setOutput('affected-libs', affected?.libs?.join(' '))
        core.setOutput(
            'affected',
            affected?.apps?.length || affected?.libs?.length
        )
    } catch (error) {
        core.setFailed(error)
    }
}

run()
