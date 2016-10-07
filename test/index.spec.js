import { expect } from 'chai'
import sparrow from '../lib/sparrow'

let lib

describe('sparrow test', () => {
  before(() => {
    lib = new sparrow()
  })

  describe('test sparrow name', () => {
    it('should return sparrow', () => {
      expect(lib.name).to.be.equal('srrow')
    })
  })
})
