package com.itwill.my_real_korea.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.my_real_korea.dto.tour.Tour;
import com.itwill.my_real_korea.dto.tour.TourImg;
import com.itwill.my_real_korea.dto.wishlist.Wishlist;
import com.itwill.my_real_korea.service.city.CityService;
import com.itwill.my_real_korea.service.tour.TourImgService;
import com.itwill.my_real_korea.service.tour.TourService;
import com.itwill.my_real_korea.util.PageMakerDto;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@Controller
public class TourController {

	@Autowired
	private TourService tourService;
	@Autowired
	private TourImgService tourImgService;
	@Autowired
	private CityService cityService;
	
	//2. 투어상품 상세보기
	@ApiOperation(value="투어상품 상세보기")
	@ApiImplicitParam(name="toNo", value="투어상품 번호")
	@GetMapping(value="/tourDetail/{toNo}", produces="application/json;charset=UTF-8")
	public Map<String, Object> tour_detail(@PathVariable int toNo) throws Exception{
		
		Map<String,Object> resultMap=new HashMap<>();
		int code=1;
		String msg="성공";
		List<Tour> data=new ArrayList<>();
		try {
			Tour tour=tourService.findTourWithCityByToNo(toNo);
			if(tour!=null) {
				List<TourImg> tourImgList=tourImgService.findTourImgList(toNo);
				tour.setTourImgList(tourImgList);
				code=1;
				data.add(tour);
			} else {
				code=2;
				msg="해당 투어 제품은 존재하지 않습니다.";
			}
		}catch (Exception e) {
			e.printStackTrace();
			code=3;
			msg="관리자에게 문의하세요.";
		}
		resultMap.put("code", code);
		resultMap.put("msg", msg);
		resultMap.put("data", data);
		
		return resultMap;
	}
	
	//1. 투어상품 전체 리스트 보기
	@ApiOperation(value="투어상품리스트")
	@GetMapping(value = "/tourList", produces="application/json;charset=UTF-8")
	public Map<String, Object> tour_list(@RequestParam(required = false, defaultValue = "1") int currentPage,
										 @RequestParam(required = false, defaultValue = "") String keyword, 
										 @RequestParam(required = false, defaultValue = "0") int cityNo, 
										 @RequestParam(required = false, defaultValue = "0") int toType, 
										 @RequestParam(required = false, defaultValue = "") String sortOrder){
		/*
		if(keyword==null) keyword="";
		if(cityNo==0) cityNo=0;
		if(toType==0) toType=0;
		if(sortOrder==null) sortOrder="";
		*/
		Map<String, Object> resultMap = new HashMap<>();
		int code = 1;
		String msg = "성공";
		PageMakerDto<Tour> data = null;
		try {
			data=tourService.findAll(currentPage,keyword, cityNo, toType, sortOrder);
			code=1;
			msg="성공";
		}catch (Exception e) {
			e.printStackTrace();
			code=2;
			msg="관리자에게 문의하세요.";
		}
		resultMap.put("code", code);
		resultMap.put("msg", msg);
		resultMap.put("data", data);
		return resultMap;
	}

}
