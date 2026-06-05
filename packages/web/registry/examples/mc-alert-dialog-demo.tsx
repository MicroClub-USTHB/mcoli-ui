import {
  McAlertDialog,
  McAlertDialogAction,
  McAlertDialogCancel,
  McAlertDialogContent,
  McAlertDialogDescription,
  McAlertDialogFooter,
  McAlertDialogHeader,
  McAlertDialogTitle,
  McAlertDialogTrigger,
} from '@/registry/ui/mc-alert-dialog';
import { Button } from '@/components/ui/button';

export default function McAlertDialogDemo() {
  return (
    <McAlertDialog>
      <McAlertDialogTrigger render={<Button variant="outline">Show Dialog</Button>} />
      <McAlertDialogContent>
        <McAlertDialogHeader>
          <McAlertDialogTitle>Are you absolutely sure?</McAlertDialogTitle>
          <McAlertDialogDescription>
            This action cannot be undone. This will permanently delete your account from our
            servers.
          </McAlertDialogDescription>
        </McAlertDialogHeader>
        <McAlertDialogFooter>
          <McAlertDialogCancel>Cancel</McAlertDialogCancel>
          <McAlertDialogAction>Continue</McAlertDialogAction>
        </McAlertDialogFooter>
      </McAlertDialogContent>
    </McAlertDialog>
  );
}
