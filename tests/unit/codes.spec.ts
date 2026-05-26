import { unserviced, servicedWithIssues } from '../../src/static/codes'

describe(`codes`, () => {
  it(`includes the no fireplace unserviced button`, () => {
    expect(unserviced).toContain(`No Fireplace`)
  })

  it(`uses updated broken damper abbreviations`, () => {
    expect(servicedWithIssues).toContain(`Broken Damper - NC`)
    expect(servicedWithIssues).toContain(`Broken Damper - SO`)
    expect(servicedWithIssues).toContain(`Broken Damper - WO`)
    expect(servicedWithIssues).not.toContain(`Broken Damper - Not Connected`)
    expect(servicedWithIssues).not.toContain(`Broken Damper - stays open`)
    expect(servicedWithIssues).not.toContain(`Broken Damper - closed/won't open`)
  })

  it(`removes refractory from panel button labels`, () => {
    expect(servicedWithIssues.filter((code) => code.includes(`Refractory`))).toHaveLength(0)
  })
})
