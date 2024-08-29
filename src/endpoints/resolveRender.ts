import type { Endpoint } from 'payload/config'
import type { Media } from 'payload/generated-types'

export const resolveRender: Omit<Endpoint, 'root'> = {
  path: '/:id/resolve-render/:render_id',
  method: 'patch',
  handler: async (req, res) => {
    const work = await req.payload.findByID({
      collection: 'works',
      id: req.params.id,
      depth: 1,
    })

    if (!work) return res.status(400).send({ work: null, errors: ['Work not found.'] })

    if (!req.user?.works?.includes(work.id)) {
      return res.status(403).send({
        work: null,
        errors: ["You don't have permission to perform this action."],
      })
    }

    const newRenders = work.renders.map(data => {
      if (data.id === req.params.render_id) {
        data = {
          ...data,
          render: {
            ...data.render,
            status: req.body.status,
            comments: req.body.comments,
          },
        }
      }

      if (typeof data.render.files[0].uploads === 'object') {
        return {
          ...data,
          render: {
            ...data.render,
            files: data.render.files.map(r => ({ uploads: (r.uploads as Media).id })),
          },
        }
      }

      return data
    })

    const updated = await req.payload.update({
      collection: 'works',
      id: req.params.id,
      data: {
        renders: newRenders,
      },
      depth: 1,
    })

    res.status(200).send({ work: updated })
  },
}
