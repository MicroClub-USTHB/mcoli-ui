"use client"

import * as React from "react"
import { McCheckbox } from "../ui/mc-checkbox"

export default function McCheckboxDemo() {
  const [checked1, setChecked1] = React.useState(false)
  const [checked2, setChecked2] = React.useState(true)
  const [checked3, setChecked3] = React.useState(false)

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-lg font-bold">McCheckbox Demo</h2>

      <div>
        <McCheckbox
          checked={checked1}
          onCheckedChange={setChecked1}
          text="Default Checkbox"
        />
      </div>

      <div>
        <McCheckbox
          checked={checked2}
          onCheckedChange={setChecked2}
          text="Checked Checkbox"
        />
      </div>

      <div>
        <McCheckbox
          checked={checked3}
          disabled
          text="Disabled Checkbox"
          supportText="Cannot change this"
        />
      </div>

      <div>
        <McCheckbox
          checked={checked1}
          onCheckedChange={setChecked1}
          text="Small Checkbox"
          size="sm"
        />
      </div>

      <div>
        <McCheckbox
          checked={checked1}
          onCheckedChange={setChecked1}
          supportText="Just support text"
        />
      </div>
    </div>
  )
}