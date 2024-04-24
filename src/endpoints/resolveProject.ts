import type { Endpoint } from 'payload/config'

export const resolveProject: Omit<Endpoint, 'root'> = {
  path: '/:id/resolve-project/:project_id',
  method: 'patch',
  handler: async (req, res) => {
    const work = await req.payload.findByID({
      collection: 'works',
      id: req.params.id,
      depth: 1,
    })

    const newProjects = work.projects.map(data => {
      if (data.id === req.params.project_id) {
        data = {
          ...data,
          project: {
            ...data.project,
            status: req.body.status,
            comments: req.body.comments,
          },
        }
      }

      if (typeof data.project.file === 'object') {
        return { ...data, project: { ...data.project, file: data.project.file.id } }
      }
      return data
    })

    const updated = await req.payload.update({
      collection: 'works',
      id: req.params.id,
      data: {
        projects: newProjects,
      },
      depth: 1,
    })

    res.status(200).send({ work: updated })
  },
}
