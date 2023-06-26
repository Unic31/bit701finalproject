package data.mapper;

import data.dto.BoardDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BoardMapper {
    public void insertBoard(BoardDto dto);
    public List<BoardDto> getPagingList(Map<String, Integer> map);//int start, int perpage
    public BoardDto detailPage(int num);
    public void deleteBoard(int num);
    public void updateReadcount(int num);
    public int getTotalCount();


}
