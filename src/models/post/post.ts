import { Column, DataType, Model, Table } from "sequelize-typescript";
import PostColumn from "./post_column";

@Table({
  timestamps: false,
  tableName: "post",
  schema: "main-schema",
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
    field: PostColumn.POSTNAME,
    allowNull: false,
  })
  postName?: string;

  @Column({
    type: DataType.STRING,
    field: PostColumn.CREATEDBY,
    allowNull: false,
  })
  createdBy?: string;

  @Column({
    type: DataType.STRING,
    field: PostColumn.PRICE,
    allowNull: false,
  })
  price?: string;

  @Column({
    type: DataType.STRING,
    field: PostColumn.PHONENO,
  })
  phoneNo?: string;
}
export default Post;
