interface localUser {
  id: number;
  email: string;
  username: string;
  password: string;
  userType: string;
  adminUsername: string;
  tasks: [
    {
      id: number;
      title: string;
      description: string;
      completed: false;
      userId: number;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
}
