import _ from "lodash"


type V0 = {}
type V1 = V0 & {x : number}
type V2 = V1 & {y : number}
type V3 = V2 & {z : number}
type V4 = V3 & {w: number}

type V0A = readonly []
type V1A = readonly [...V0A, number]
type V2A = readonly [...V1A, number]
type V3A = readonly [...V2A, number]
type V4A = readonly [...V3A, number]

type AllowedVArrays = V0A | V1A | V2A | V3A | V4A

type V = V0 | V1 | V2 | V3 | V4

type VA = V0[] | V1[] | V2[] | V3[] | V4[]


type AV0 = []
type AV1 = [...AV0, x: number]
type AV2 = [...AV1, y: number]
type AV3 = [...AV2, z: number]
type AV4 = [...AV3, w: number]

type M = AV0 | AV1 | AV2 | AV3 | AV4 

const av : AV2 = [3, 4]

const z = 2

type C = {0: "dkfj"}
const c: C = {0: "dkfj"}

type GrowToSize<T, N extends number, A extends T[]> = 
  A['length'] extends N ? A : GrowToSize<T, N, [...A, T]>;

export type FixedArray<T, N extends number> = GrowToSize<T, N, []>;

type MapArraysToVs<AV> = AV extends V0A ?
    V0 : AV extends V1A ?
    V1 : AV extends V2A ?
    V2 : AV extends V3A ?
    V3 : AV extends V4A ?
    V4 : never

type X = Parameters<(x: number, y: number) => boolean>
// const v :  = (x: number, y: number) => x

type UserTuple = [name: string, age?: number, ...addresses: string[]]

// function v<T extends M>(...zzzz: T) {
//     return zzzz
// } 

// let zzzzzzz = v(0, 0, 0)
// zzzzzzz[0] += 3


// const gggg = zzzzzzz

// function v(): V0
// function v(x?: number): V1
// function v(x?: number, y?: number): V2
// function v(x?: number, y?: number, z?: number): V3
// function v(x?: number, y?: number, z?: number, w?: number): V4
// function v(x?: number, y?: number, z?: number, w?: number) {
//     return {x, y, z, w}
// }

function v(...V) {

}

// function add<V extends AllowedVs>(v: V, n: number): V
function add<Vec extends V, Z extends V[]>(...vs: Z): Vec {
    return _.mergeWith(vs, (xs: number[]) => _.sum(xs))
}

function scale<Vec extends V>(v: Vec, scaleBy: number): Vec {
    return _.mapValues(v, (dim: number) => dim*scaleBy) as any
}


function pompe(x: number, y: number, z: number, w: number) {

}

// function mult<V extends AllowedVs>()

// const x = v()
// const x = add(v(1,2), v(3,4,5))
// const x = v(1,2,3,4)