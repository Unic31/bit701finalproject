package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("BoardDto")
public class BoardDto {
    private int num;
    private String myid;
    private String myname;
    private String photo;
    private String subject;
    private String content;
    private int readcount;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp writeday;

}
