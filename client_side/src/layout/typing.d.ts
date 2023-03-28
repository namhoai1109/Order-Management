interface IMenuItem {
  key: string;
  label: string;
}

interface IMenu {
  list: IMenuItem[];
  prevPath: string;
}
