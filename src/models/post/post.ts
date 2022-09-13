import { Column, DataType, Model, Table } from "sequelize-typescript";
import PostColumn from "./post_column";

@Table({
  timestamps: false,
  tableName: "post-table",
  schema: "post",
})
class Post extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    field: PostColumn.ID,
    primaryKey: true,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    field: PostColumn.NAME,
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    field: PostColumn.EMAIL,
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    field: PostColumn.PHONENO,
    allowNull: false,
  })
  phoneNo?: string;

  @Column({
    type: DataType.STRING,
    field: PostColumn.USERTYPE,
    allowNull: false,
  })
  userType?: string;
}
export default Post;
