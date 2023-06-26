package data.controller;

import data.dto.BoardDto;
import data.service.BoardService;
import data.service.BoardServiceInter;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

@RestController
@CrossOrigin
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private NcpObjectStorageService storageService;

    //버킷이름
    private String bucketName="bit701-bucket-113";

    //사진 업로드할 변수
    String photo;

    @Autowired
    private BoardService boardService;

    @PostMapping("/upload")
    public String photoUpload(MultipartFile upload){
        System.out.println("upload>>"+upload);
        if(photo!=null){
            //이전 사진 삭제
            storageService.deleteFile(bucketName,"board",photo);
        }
        photo=storageService.uploadFile(bucketName, "board", upload);

        //스토리지에 저장
        return photo;
    }
    @PostMapping("/insert")
    public void insert(@RequestBody BoardDto dto){
        System.out.println("insert>>"+dto);
        dto.setPhoto(photo); //변수로 지정된 사진(스토리지에 저장된 사진) 이름을 db에저장
        boardService.insertBoard(dto);
        photo=null;
    }

    @GetMapping("/detail")
    public BoardDto detailPage(int num){
        System.out.println("detail>>"+num);
        boardService.updateReadcount(num);

        return boardService.detailPage(num);
    }

    @GetMapping("/list")
    public Map<String, Object> list(@RequestParam(defaultValue = "1") int currentPage){
        System.out.println("list>>"+currentPage);
        //페이징처리
        int totalCount;//총갯수
        int perPage=3;//한페이지당 출력할 글갯수
        int perBlock=3;//출력할 페이지갯수
        int startNum;//db에서 가져올 시작번호
        int startPage;//출력할 시작페이지
        int endPage;//출력할 끝페이지
        int totalPage;//총 페이지수
        int no;//출력할 시작번호

        //총갯수
        totalCount=boardService.getTotalCount();
        //총 페이지수
        totalPage=totalCount/perPage+(totalCount%perPage==0?0:1);
        //시작페이지
        startPage=(currentPage-1)/perBlock*perBlock+1;
        //끝페이지
        endPage=startPage+perBlock-1;
        if(endPage>totalPage)
            endPage=totalPage;

        //시작번호
        startNum=(currentPage-1)*perPage;
        //각페이지당 출력할 번호
        no=totalCount-(currentPage-1)*perPage;

        List<BoardDto> list=boardService.getPagingList(startNum, perPage);

        //출력할 페이지번호들을 Vector에 담아서 보내기
        Vector<Integer> parr=new Vector<>();
        for(int i=startPage;i<=endPage;i++){
            parr.add(i);
        }

        //리액트로 필요한 변수들을 Map 에 담아서 보낸다
        Map<String,Object> smap=new HashMap<>();
        smap.put("totalCount",totalCount);
        smap.put("list",list);
        smap.put("parr",parr);
        smap.put("startPage",startPage);
        smap.put("endPage",endPage);
        smap.put("no",no);
        smap.put("totalPage",totalPage);

        return  smap;

    }

    @DeleteMapping("/delete")
    public void delete(int num){
        //num에 해당하는 사진 스토리지에서 지우기
        String prePhoto=boardService.detailPage(num).getPhoto();
        storageService.deleteFile(bucketName,"board",prePhoto);

        //db에서 데이터 삭제
        boardService.deleteBoard(num);
    }


}
