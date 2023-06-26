package data.service;

import data.dto.BoardDto;
import data.mapper.BoardMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@AllArgsConstructor
public class BoardService implements BoardServiceInter {

    private BoardMapper boardMapper;

    @Override
    public void insertBoard(BoardDto dto) {
        boardMapper.insertBoard(dto);

    }

    @Override
    public List<BoardDto> getPagingList(int start, int perpage) {
        Map<String,Integer> map=new HashMap<>();
        map.put("start",start);
        map.put("perpage",perpage);

        return boardMapper.getPagingList(map);
    }

    @Override
    public BoardDto detailPage(int num) {
        return boardMapper.detailPage(num);
    }

    @Override
    public void deleteBoard(int num) {
        boardMapper.deleteBoard(num);
    }

    @Override
    public void updateReadcount(int num) {
        boardMapper.updateReadcount(num);
    }

    @Override
    public int getTotalCount() {
        return boardMapper.getTotalCount();
    }
}
