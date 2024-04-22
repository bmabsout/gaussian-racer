import _ from "lodash"
import { Vector2 } from "mz-math"

export type Gaussian = {
    mean: Vector2,
    std: Vector2
}

export function gaussiansToData(gaussians: Gaussian[]) {
    const toData = (f: (g: Gaussian) => Vector2) =>
        _.flatten(gaussians.map(a => f(a).map(e => [e])))
    return {
        means: toData(g => g.mean),
        stds: toData(g => g.std)
    }
}
