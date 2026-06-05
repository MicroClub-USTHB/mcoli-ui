import {
  McAvatar,
  McAvatarBadge,
  McAvatarFallback,
  McAvatarGroup,
  McAvatarGroupCount,
  McAvatarImage,
} from '@/registry/ui/mc-avatar';

export default function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-6 md:gap-12">
      <McAvatar>
        <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
        <McAvatarFallback>CN</McAvatarFallback>
      </McAvatar>
      <McAvatar>
        <McAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
        <McAvatarFallback>ER</McAvatarFallback>
        <McAvatarBadge className="bg-green-600 dark:bg-green-800" />
      </McAvatar>
      <McAvatarGroup className="grayscale">
        <McAvatar>
          <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
          <McAvatarFallback>CN</McAvatarFallback>
        </McAvatar>
        <McAvatar>
          <McAvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
          <McAvatarFallback>LR</McAvatarFallback>
        </McAvatar>
        <McAvatar>
          <McAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
          <McAvatarFallback>ER</McAvatarFallback>
        </McAvatar>
        <McAvatarGroupCount>+3</McAvatarGroupCount>
      </McAvatarGroup>
    </div>
  );
}
