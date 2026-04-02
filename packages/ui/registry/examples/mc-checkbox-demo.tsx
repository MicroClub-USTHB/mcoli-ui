import { McCheckbox } from "../ui/mc-checkbox"

export default function McCheckboxDemo() {
  return (
    <div className="flex flex-col gap-4">
      <McCheckbox text="Remember me" />
      <McCheckbox text="Remember me" defaultChecked />
      <McCheckbox text="Remember me" supportText="Save my login details for next time." />
      <McCheckbox text="Remember me" supportText="Save my login details for next time." defaultChecked />
      <McCheckbox text="Remember me" disabled />
    </div>
  )
}