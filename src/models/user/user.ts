import { Table, Model, Column, DataType } from "sequelize-typescript";
import UserColumn from "./user_column";

@Table({
  tableName: "user",
  schema: "main-schema",
})
class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    field: UserColumn.ID,
    primaryKey: true,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    field: UserColumn.NAME,
    allowNull: false,
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    field: UserColumn.EMAIL,
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    field: UserColumn.PHONENO,
    allowNull: false,
  })
  phoneNo?: string;

  @Column({
    type: DataType.STRING,
    field: UserColumn.USERTYPE,
    allowNull: false,
  })
  userType?: string;
}
export default User;
